<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\OrderConfirmationMail;

class OrderController extends Controller
{

    public function vnpay_payment()
    {
        $vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
        $vnp_Returnurl = "http://localhost:5173/order";
        $vnp_TmnCode = "QE9DX1Z6"; //Mã website tại VNPAY 
        $vnp_HashSecret = "QO9U9MCBTAAX3ZJBOKG9B3U7UOF8YW9X"; //Chuỗi bí mật

        $vnp_TxnRef = uniqid('order_', true); 
        $vnp_OrderInfo = 'Thanh toán đơn hàng';
        $vnp_OrderType = 'billpayment';
        $vnp_Amount = 20000 * 100;
        $vnp_Locale = 'vn';
        $vnp_BankCode = 'NCB';
        $vnp_IpAddr = $_SERVER['REMOTE_ADDR'];
        //Add Params of 2.0.1 Version
        // $vnp_ExpireDate = $_POST['txtexpire'];
        //Billing
        $inputData = array(
            "vnp_Version" => "2.1.0",
            "vnp_TmnCode" => $vnp_TmnCode,
            "vnp_Amount" => $vnp_Amount,
            "vnp_Command" => "pay",
            "vnp_CreateDate" => date('YmdHis'),
            "vnp_CurrCode" => "VND",
            "vnp_IpAddr" => $vnp_IpAddr,
            "vnp_Locale" => $vnp_Locale,
            "vnp_OrderInfo" => $vnp_OrderInfo,
            "vnp_OrderType" => $vnp_OrderType,
            "vnp_ReturnUrl" => $vnp_Returnurl,
            "vnp_TxnRef" => $vnp_TxnRef
            // "vnp_ExpireDate"=>$vnp_ExpireDate
        );

        if (isset($vnp_BankCode) && $vnp_BankCode != "") {
            $inputData['vnp_BankCode'] = $vnp_BankCode;
        }
        if (isset($vnp_Bill_State) && $vnp_Bill_State != "") {
            $inputData['vnp_Bill_State'] = $vnp_Bill_State;
        }

        //var_dump($inputData);
        ksort($inputData);
        $query = "";
        $i = 0;
        $hashdata = "";
        foreach ($inputData as $key => $value) {
            if ($i == 1) {
                $hashdata .= '&' . urlencode($key) . "=" . urlencode($value);
            } else {
                $hashdata .= urlencode($key) . "=" . urlencode($value);
                $i = 1;
            }
            $query .= urlencode($key) . "=" . urlencode($value) . '&';
        }

        $vnp_Url = $vnp_Url . "?" . $query;
        if (isset($vnp_HashSecret)) {
            $vnpSecureHash =   hash_hmac('sha512', $hashdata, $vnp_HashSecret); //  
            $vnp_Url .= 'vnp_SecureHash=' . $vnpSecureHash;
        }
        $returnData = array(
            'code' => '00',
            'message' => 'success',
            'data' => $vnp_Url
        );
        if (isset($_POST['redirect'])) {
            header('Location: ' . $vnp_Url);
            die();
        } else {
            echo json_encode($returnData);
        }
        // vui lòng tham khảo thêm tại code demo
    }

    public function index(Request $request)
    {
        $userId = $request->query('user_id');

        // Lấy đơn hàng của người dùng hoặc tất cả nếu không có user_id
        $orders = Order::with('user', 'items')
            ->when($userId, function ($query, $userId) {
                return $query->where('user_id', $userId);
            })
            ->get();

        return response()->json($orders);
    }


    // Get a single order
    public function show($id)
    {
        $order = Order::with('items')->find($id);
        if ($order) {
            return response()->json($order);
        } else {
            return response()->json(['message' => 'Order not found'], 404);
        }
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
            'status' => 'required|string',
            'total_price' => 'required|numeric',
        ]);

        // Tạo đơn hàng mới
        $order = Order::create($validatedData);

        return response()->json($order, 201);
    }


    // Update an existing order
    public function update(Request $request, $id)
    {
        $order = Order::find($id);
        if ($order) {
            $validatedData = $request->validate([
                'user_id' => 'sometimes|required|exists:users,id',
                'status' => 'sometimes|required|string|in:Pending,Processing,Shipped,Completed,Cancelled', // Danh sách các trạng thái
                'total_price' => 'sometimes|required|numeric',
            ]);

            $order->update($validatedData);
            return response()->json($order);
        } else {
            return response()->json(['message' => 'Order not found'], 404);
        }
    }


    // Delete an order
    public function destroy($id)
    {
        $order = Order::with('items')->find($id);
        if ($order) {
            // Xóa tất cả các order items liên quan
            foreach ($order->items as $item) {
                $item->delete();
            }

            $order->delete();
            return response()->json(['message' => 'Order and its items deleted successfully']);
        } else {
            return response()->json(['message' => 'Order not found'], 404);
        }
    }


    public function sendOrderConfirmation(Request $request)
    {
        // Xác thực dữ liệu đầu vào
        $validatedData = $request->validate([
            'order_id' => 'required|exists:orders,id',
            'email' => 'required|email'
        ]);

        $orderId = $validatedData['order_id'];
        $userEmail = $validatedData['email'];

        // Tìm đơn hàng cùng với các items và thông tin liên quan
        $order = Order::with('items.productVariantSize')->find($orderId);

        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        // Tìm người dùng dựa trên email
        $user = User::where('email', $userEmail)->first();

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        try {
            // Gửi email xác nhận
            Mail::to($user->email)->send(new OrderConfirmationMail($order, $user));
            return response()->json(['message' => 'Order confirmation email sent successfully.'], 200);
        } catch (\Exception $e) {
            // Log lỗi và trả về phản hồi lỗi
            \Log::error('Failed to send order confirmation email: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to send order confirmation email.'], 500);
        }
    }
}

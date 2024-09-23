<!DOCTYPE html>
<html>
<head>
    <title>Order Confirmation</title>
</head>
<body>
    <h1>Thank you for your order!</h1>

    @if($order->user)
        <p>Dear {{ $order->user->name }},</p>
    @else
        <p>Dear Valued Customer,</p>
    @endif

    <p>Your order #{{ $order->id }} has been successfully placed.</p>
    <p>Total: ${{ number_format($order->total_price, 2) }}</p>
    <p>We will notify you when your order is shipped.</p>

    <h3>Order Details:</h3>
    <ul>
        @foreach($order->items as $item)
            <li>{{ $item->productVariantSize->name }} ({{ $item->quantity }} x ${{ number_format($item->price, 2) }})</li>
        @endforeach
    </ul>

    <p>Thank you for shopping with us!</p>
</body>
</html>

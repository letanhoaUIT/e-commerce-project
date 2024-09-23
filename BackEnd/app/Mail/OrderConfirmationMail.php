<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class OrderConfirmationMail extends Mailable
{
    use Queueable, SerializesModels;

    public $order;
    public $user;

    public function __construct($order, $user)
    {
        $this->order = $order;
        $this->user = $user;
    }

    public function build()
    {
        return $this->view('emails.order_confirmation')
                    ->from('21522219@gm.uit.edu.vn', 'Sun Asterisk')  // Địa chỉ email và tên của bạn
                    ->with([
                        'order' => $this->order,
                        'user' => $this->user,
                    ]);
    }
}

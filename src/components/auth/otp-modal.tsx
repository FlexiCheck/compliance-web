'use client';

import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { verifyOtpAction, resendOtpAction } from '@/lib/api/auth'; // <-- Import resendOtpAction

type Props = {
  email: string;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export const OtpModal = ({ email, open, onClose, onSuccess }: Props) => {
  const [otp, setOtp] = useState('');
  // --- START: New state for cooldown timer ---
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (cooldown > 0) {
      timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [cooldown]);
  // --- END: New state for cooldown timer ---

  const $verifyOtp = useMutation({
    mutationKey: ['verify-otp', email],
    mutationFn: () => verifyOtpAction({ email, otp }),
    onSuccess: () => {
      toast.success('OTP verified successfully!');
      onClose();
      onSuccess();
    },
    onError: (err: any) => {
      toast.error(err.message || 'Invalid OTP');
    },
  });

  // --- START: New mutation for resending OTP ---
  const $resendOtp = useMutation({
    mutationKey: ['resend-otp', email],
    mutationFn: () => resendOtpAction({ email }),
    onSuccess: (data: any) => {
      toast.success(data.message || 'A new OTP has been sent.');
      setCooldown(60); // Start 60-second cooldown
    },
    onError: (err: any) => {
      toast.error(err.message || 'Failed to resend OTP.');
    },
  });
  // --- END: New mutation for resending OTP ---

  const handleVerify = () => {
    $verifyOtp.mutate();
  };

  const handleResend = () => {
    $resendOtp.mutate();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Enter OTP</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <Input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter the 6-digit OTP"
            disabled={$verifyOtp.isPending}
          />

          <Button
            className="w-full"
            onClick={handleVerify}
            isLoading={$verifyOtp.isPending}
            disabled={otp.length < 6}
          >
            Verify OTP
          </Button>

          {/* --- START: New Resend Button --- */}
          <div className="text-center">
            <Button
              variant="link"
              className="p-0 h-auto"
              onClick={handleResend}
              disabled={cooldown > 0 || $resendOtp.isPending}
            >
              {cooldown > 0 ? `Resend OTP in ${cooldown}s` : 'Did not receive OTP? Resend'}
            </Button>
          </div>
          {/* --- END: New Resend Button --- */}
        </div>
      </DialogContent>
    </Dialog>
  );
};

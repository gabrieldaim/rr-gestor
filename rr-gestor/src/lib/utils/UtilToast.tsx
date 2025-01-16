import React from 'react';
import { Toaster, toast } from 'sonner';
import { CheckCircleIcon, XCircleIcon, AlertTriangleIcon } from 'lucide-react';

export const UtilToast: React.FC = () => (
    <Toaster position='top-right'
        icons={{
            success: <CheckCircleIcon className="w-6 h-6 text-green-500" />,
            error: <XCircleIcon className="w-6 h-6 text-red-500" />,
            warning: <AlertTriangleIcon className="w-6 h-6 text-yellow-500" />,
        }}
    />
);

export const showToast = (type: 'success' | 'error' | 'warning', text: string) => {
    console.log('showToast', type, text);
    if (type === 'success') {
        return toast.success(text);
    } else if (type === 'error') {
        return toast.error(text);
    } else if (type === 'warning') {
        return toast.warning(text);
    }
};

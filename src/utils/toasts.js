import toast from 'react-hot-toast';

export const successToast = (message = "Success") => {
    toast.dismiss()
    toast.success(message);
}

export const errorToast = (message = "Something Went Wrong") => {
    toast.dismiss()
    toast.error(message);
}
import Swal from "sweetalert2";
import type { SweetAlertIcon, SweetAlertResult } from "sweetalert2";
import { useNavigate } from "react-router-dom";

interface SweetAlertButton {
  text: string;
  className: string;
  link?: string; // لینک اختیاری برای هدایت
}

interface SweetAlertConfig {
  title: string;
  description: string;
  icon: SweetAlertIcon;
  confirmButton?: SweetAlertButton;
  cancelButton?: SweetAlertButton;
  timer?: number; // مدت زمان تایمر به میلی‌ثانیه
  autoClose?: boolean; // آیا پاپ‌آپ به صورت خودکار بسته شود
}

const useSweetAlert = () => {
  const navigate = useNavigate();

  const showAlert = async ({
    title,
    description,
    icon,
    confirmButton,
    cancelButton,
    timer,
    autoClose = false,
  }: SweetAlertConfig): Promise<SweetAlertResult> => {
    const result = await Swal.fire({
      title,
      html: `<p class="text-gray-600 mb-6">${description}</p>`,
      icon,
      showCancelButton: !!cancelButton,
      confirmButtonText: confirmButton?.text || "باشه",
      cancelButtonText: cancelButton?.text || "بستن",
      timer: autoClose && timer ? timer : undefined, // فعال کردن تایمر فقط در صورت autoClose: true
      timerProgressBar: autoClose && timer ? true : false, // نمایش نوار پیشرفت تایمر
      customClass: {
        container: "font-sans",
        title: "text-xl font-semibold text-gray-800 mb-4",
        htmlContainer: "text-sm",
        actions: "flex justify-end gap-4",
        confirmButton:
          confirmButton?.className ||
          "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md",
        cancelButton:
          cancelButton?.className ||
          "border border-gray-300 text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md",
      },
      buttonsStyling: false,
      allowOutsideClick: !autoClose, // جلوگیری از بستن با کلیک خارج در صورت autoClose
      allowEscapeKey: !autoClose, // جلوگیری از بستن با کلید Escape در صورت autoClose
      allowEnterKey: !autoClose, // جلوگیری از بستن با کلید Enter در صورت autoClose
    });

    // هدایت به لینک در صورت کلیک روی دکمه تأیید
    if (result.isConfirmed && confirmButton?.link) {
      navigate(confirmButton.link);
    }

    return result;
  };

  return { showAlert };
};

export default useSweetAlert;

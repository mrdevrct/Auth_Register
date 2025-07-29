import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-white text-gray-800 p-6 shadow-lg">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo and Description */}
        <div className="text-center md:text-right">
          <h2 className="text-2xl font-bold text-blue-600">لوگو</h2>
          <p className="mt-2 text-sm text-gray-600">
            ما یک شرکت پیشرو در ارائه خدمات نوآورانه هستیم. هدف ما ایجاد ارزش و
            بهبود تجربه کاربران است.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="text-center md:text-right">
          <h3 className="text-lg font-semibold text-gray-800">لینک‌های مفید</h3>
          <ul className="mt-4 space-y-2">
            <li>
              <a
                href="/about"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                درباره ما
              </a>
            </li>
            <li>
              <a
                href="/services"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                خدمات
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                تماس با ما
              </a>
            </li>
            <li>
              <a
                href="/privacy"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                حریم خصوصی
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media and Contact */}
        <div className="text-center md:text-right">
          <h3 className="text-lg font-semibold text-gray-800">
            با ما در ارتباط باشید
          </h3>
          <div className="mt-4 flex justify-center md:justify-end space-x-4">
            <a
              href="https://facebook.com"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href="https://twitter.com"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="https://instagram.com"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://linkedin.com"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              <FaLinkedin size={24} />
            </a>
          </div>
          <p className="mt-4 text-sm text-gray-600">
            ایمیل: info@example.com
            <br />
            تلفن: ۱۲۳۴-۵۶۷-۸۹۰
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-8 border-t border-gray-200 pt-4 text-center">
        <p className="text-sm text-gray-600">
          © ۱۴۰۴ | تمامی حقوق محفوظ است. طراحی و توسعه توسط{" "}
          <Link to="/" className="text-blue-600 hover:underline">
            تیم وبینو (Devrct)
          </Link>
        </p>
      </div>
    </footer>
  );
}

export default Footer;

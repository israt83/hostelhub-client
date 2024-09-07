const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 shadow-sm mt-10">
      <hr />
      <div className="container  items-center justify-between px-6 py-8 mx-auto lg:flex-row">
        {/* <img
        
          src="src/assets/images/logo.png"
          alt="logo"
          width="180"
          height="150"
        /> */}
        {/*          
          <p className="-ml-12 mt-3 text-2xl text-black uppercase text-center py-2">
            <span className="text-4xl text-orange-600">H</span>ostel
            <span className="text-4xl text-orange-600">H</span>ub
          </p> */}

        <div className="flex flex-wrap items-center justify-center gap-4 mt-6 lg:gap-6 lg:mt-0">
          <a
            href="#"
            className="text-sm text-gray-600 transition-colors duration-300 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400"
          >
            Overview
          </a>

          <a
            href="#"
            className="text-sm text-gray-600 transition-colors duration-300 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400"
          >
            Features
          </a>

          <a
            href="#"
            className="text-sm text-gray-600 transition-colors duration-300 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400"
          >
            Pricing
          </a>
          <a
            href="#"
            className="text-sm text-gray-600 transition-colors duration-300 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400"
          >
            Careers
          </a>

          <a
            href="#"
            className="text-sm text-gray-600 transition-colors duration-300 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400"
          >
            Help
          </a>

          <a
            href="#"
            className="text-sm text-gray-600 transition-colors duration-300 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400"
          >
            Privacy
          </a>
        </div>

        <p className="mt-6 text-sm text-gray-500 lg:mt-0 dark:text-gray-400 text-center py-5">
          © Copyright 2021. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

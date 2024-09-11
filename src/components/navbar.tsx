import React from 'react';
import { Popover } from '@headlessui/react';
import SearchForm from './search-form';

const Navbar: React.FC = () => {
  return (
    <div className="mt-5">
      <Popover as="header">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between lg:gap-8 xl:grid xl:grid-cols-12">
            <div className="flex items-center lg:col-span-2">
              <a href="#">
                <img
                  className="block h-8 w-auto"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGKjhz5aIvPEBpyvbCsK5xF41jhD_v83ZWIw&s"
                  alt="Your Company"
                />
              </a>
            </div>
            <div className="lg:col-span-9">
              <SearchForm />
            </div>
          </div>
        </div>
      </Popover>
    </div>
  );
};

export default Navbar;

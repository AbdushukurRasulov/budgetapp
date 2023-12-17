import { Menu } from '@headlessui/react';
import { IoMdContact } from 'react-icons/io';

const HeaderMenu = () => {
  const userRole = window.localStorage.getItem('userRole');
  const username = window.localStorage.getItem('username');

  return (
    <div className="z-50 text-right">
      <Menu
        as="div"
        className="relative inline-block text-left text-base-content "
      >
        <div>
          <Menu.Button className="inline-flex w-full justify-center py-2">
            <IoMdContact />
          </Menu.Button>
        </div>

        <Menu.Items className="absolute right-0 mt-4 w-60 origin-top-right divide-y divide-neutral rounded-md border border-neutral bg-gray-50 shadow-sm">
          <div className="flex flex-col space-y-1 text-gray-700 text-sm px-2 justify-center py-4 placeholder-opacity-80">
            <p>user: {username}</p>
            <p>role: {userRole}</p>
          </div>
          <div className="">
            <Menu.Item>
              {({ active }) => (
                <div
                  className={`${
                    active ? 'bg-[#80b7bd]' : ''
                  }  flex w-full  px-4 py-6 text-sm text-gray-700`}
                >
                  Settings
                </div>
              )}
            </Menu.Item>
          </div>
          <div className="py-4 px-2">
            <Menu.Item>
              {({ active }) => (
                <div
                  className={`${
                    active ? 'hover:bg-fuchsia-600  ' : ''
                  }   text-sm bg-fuchsia-500 text-white rounded-md justify-center flex w-full py-2`}
                >
                  Log Out
                </div>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Menu>
    </div>
  );
};
export default HeaderMenu;

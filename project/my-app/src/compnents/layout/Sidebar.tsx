import { useEffect, useState } from 'react';
import { IconContext } from 'react-icons';
import {
  FiBarChart2,
  FiChevronLeft,
  FiCoffee,
  FiCreditCard,
  FiCrosshair,
  FiHome,
  FiUserPlus,
} from 'react-icons/fi';
import { TbMoneybag } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();

  const adminMenu = [
    { title: 'Admin', src: <FiHome />, navigate: '/admin' },
    { title: 'Budget', src: <TbMoneybag />, navigate: '/admin/budget' },
    {
      title: 'Pocket money planning',
      src: <FiCreditCard />,
      navigate: '/admin/pocket-money',
    },
    { title: 'Users', src: <FiUserPlus />, navigate: '/admin/users' },
    { title: 'Tasks', src: <FiCoffee />, navigate: '/admin/tasks' },
  ];
  const userMenu = [
    { title: 'Cash flow', src: <FiCreditCard />, navigate: '/user/cash-flow' },
    { title: 'Overview', src: <FiBarChart2 />, navigate: 'user/overview' },
    { title: 'Goals', src: <FiCrosshair />, navigate: '/user/goals' },
    { title: 'Tasks', src: <FiCoffee />, navigate: 'user/my-tasks' },
  ];

  useEffect(() => {
    const userRole = window.localStorage.getItem('userRole');
    if (userRole !== 'ADMIN') {
      setIsAdmin(false);
    } else {
      setIsAdmin(true);
    }
  }, [navigate]);

  const menuItems = isAdmin ? adminMenu : userMenu;

  return (
    <div
      className={` ${
        open ? 'w-72' : 'w-20 '
      } bg-gray-200 h-screen p-5  pt-8 relative duration-300`}
    >
      <IconContext.Provider
        value={{
          color: '#459ca7',
          className:
            'global-class-name text-4xl absolute cursor-pointer -right-3 top-[300px] w-7 bg-white border-2 rounded-full',
        }}
      >
        <FiChevronLeft
          className={`${!open && 'rotate-180'}`}
          onClick={() => setOpen(!open)}
        />
      </IconContext.Provider>

      <ul className="">
        {menuItems.map((Menu, index) => (
          <li
            key={index}
            className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-xl items-center gap-x-4 
              ${'mt-2'} ${index === 0 && 'bg-light-white'} `}
            onClick={() => navigate(Menu.navigate)}
          >
            <IconContext.Provider
              value={{
                color: '#459ca7',
                className: 'global-class-name text-4xl ',
              }}
            >
              {Menu.src}
            </IconContext.Provider>
            <span className={`${!open && 'hidden'} origin-left duration-200`}>
              {Menu.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

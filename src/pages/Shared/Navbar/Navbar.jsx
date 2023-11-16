import { Link } from "react-router-dom";

const Navbar = () => {
    const navItems = <>
        <li><Link to={'/'}>HOME</Link></li>
        <li><Link to={'/menu'}>OUR MENU</Link></li>
        <li><Link to={'/order/salad'}>OUR SHOP</Link></li>
    </>

    const dropDownMenu = <>
        <summary>Parent</summary>
        <ul className="p-2 bg-black bg-opacity-30 text-white">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
        </ul>
    </>

    return (
        <div className="navbar max-w-screen-xl fixed z-10 bg-black bg-opacity-30 text-white">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navItems}
                        {dropDownMenu}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">Bistro Boss</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navItems}
                    <li tabIndex={0}>
                        <details>
                            {dropDownMenu}
                        </details>
                    </li>
                </ul>
            </div>
            <div className="navbar-end">
                <a className="btn">Button</a>
            </div>
        </div>
    );
};

export default Navbar;
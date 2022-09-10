import React from 'react';
import styles from './nav.module.scss'

import {MaterialSymbolsSettingsOutline, MdiAccount, MdiHomeCircle} from "@/components/ui/icons/icons";
import NavLink, {NavLinkPros} from "@/components/ui/navUI/navLink";

const NavUi = (): JSX.Element => {
    const listLink: NavLinkPros[] =[
        {icon:<MdiHomeCircle/>,link:'dashboard'},
        {icon:<MdiAccount/>,link:'accounts'},
        {icon:<MaterialSymbolsSettingsOutline/>,link:'settings'},
    ]
    return (
        <nav className={styles.main_menu}>
            <div className={styles.main_menu_title}>
                <h2>Budget APP</h2>
            </div>
            <ul className={styles.menu}>
                {
                    listLink.map((link)=>(
                        <NavLink key={link.link} {...link}/>
                    ))
                }
            </ul>

        </nav>
    );
};

export default NavUi;

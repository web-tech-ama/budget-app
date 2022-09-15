import React, {useState} from 'react';
import styles from './nav.module.scss'

import {
    BxBxsDashboard,
    CharmMenuHamburger,
    MaterialSymbolsSettingsOutline,
    MdiAccount,

} from "@/components/ui/icons/icons";
import NavLink, {NavLinkPros} from "@/components/ui/navUI/navLink";

const NavUi = (): JSX.Element => {
    const [active,setActive]=useState<boolean>(false)
    const handelActive =()=>{
        setActive(!active)
    }
    const classes=(cls:string,activeCls:string|null)=>{
        let arrayClass =[cls]
        if (activeCls){
            arrayClass.push(activeCls)
        }

        return arrayClass.join(' ')
    }
    const listLink: NavLinkPros[] =[
        {icon:<BxBxsDashboard/>,link:'dashboard'},
        {icon:<MdiAccount/>,link:'accounts'},
        {icon:<MaterialSymbolsSettingsOutline/>,link:'settings'},
    ]
    return (
        <aside className={ classes(styles.sidebar,active? styles.sidebar_active: null)}>
            <div className={styles.main_menu_title}>
                {active?(<h2>Budget APP</h2> ):(<h2>BA</h2> )

                }

                <div>
                    <button className={styles.main_menu_btn}  onClick={handelActive}>
                        <CharmMenuHamburger/>
                    </button>
                </div>
            </div>
            <nav className={styles.main_menu}>

                <ul className={styles.menu}>
                    {
                        listLink.map((link)=>(
                            <NavLink key={link.link} {...link}/>
                        ))
                    }
                </ul>

            </nav>
        </aside>

    );
};

export default NavUi;

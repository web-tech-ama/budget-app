import React from 'react';
import Link from "next/link";
import styles from '@/components/ui/navUI/nav.module.scss'
import { useRouter } from "next/router";
import {Classes} from "@/utils/classes";

export interface NavLinkPros {
    icon:JSX.Element ,
    link: string,
}
const NavLink:React.FC<NavLinkPros> = ({icon,link}): JSX.Element => {

    const router = useRouter();
    const cls =[styles.link , router.pathname == `/${link}` ? styles.active:'']
    return (
        <li className={Classes(cls)}>

            <Link className={styles.link_item} href={`/${link}`} passHref>
                <a className={styles.link_item_link}>
                    <span className={styles.link_icon} >{icon}</span>
                    <span className={styles.link_text}>
                        { link[0].toUpperCase()+ link.slice(1)}
                    </span>

                </a>

            </Link>
            <span className={styles.mobile_link_item_link}>{ link[0].toUpperCase()+ link.slice(1)}</span>
        </li>
    );
};

export default NavLink;

import React from 'react';
import Link from "next/link";
import styles from '@/components/ui/navUI/nav.module.scss'
import { useRouter } from "next/router";
import {Classes} from "@/utils/classes";
import {UpperCase} from "@/utils/upperCase";

export interface NavLinkPros {
    icon:JSX.Element ,
    link: string,
    label:string
}
const NavLink:React.FC<NavLinkPros> = ({icon,link,label}): JSX.Element => {

    const router = useRouter();
    const cls =[styles.link , router.pathname == `/${link}` ? styles.active:'']
    return (
        <li className={Classes(cls)}>

            <Link className={styles.link_item} href={`/${link}`} passHref>
                <a className={styles.link_item_link}>
                    <span className={styles.link_icon} >{icon}</span>
                    <span className={styles.link_text}>
                        {UpperCase(label)}
                    </span>

                </a>

            </Link>
            <span className={styles.mobile_link_item_link}>{ UpperCase(label)}</span>
        </li>
    );
};

export default NavLink;

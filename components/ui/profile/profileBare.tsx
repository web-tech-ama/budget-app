import React, {useState} from 'react';
import styles from './profileBare.module.scss'
import {useAuth} from "@/context/AuthUserContext";
import {RiLoginCircleFill, RiLogoutCircleFill} from "@/components/ui/icons/icons";
import Link from "next/link";
import Profile from "@/components/ui/profile/profile";
import Select from "@/components/ui/select/select";
import Options from "@/components/ui/select/Options";
import {useStore} from "@/context/StroeContext";

const ProfileBare = () => {
    const { user,signOut } = useAuth()
    const {selectLang, setSelectLang,langJson} =useStore()
    const [isSelect, setIsSelect]= useState<boolean>(false)
    const [getId ,setGetId]=useState<number|undefined>(0)

    const handelSelect =()=>{
        setIsSelect((prevState)=>!prevState)
    }
    const lang=[{value:'EN'},{value:'FR'},{value:'ESP'}]


    return (
        <div className={styles.profile_bare}>

        <div className={styles.profile_info}>

            {user?(
                <div>

                    <RiLogoutCircleFill/>
                        <p className={styles.profile_sign_out} onClick={signOut}>{langJson.form.label?.logoutLabel}</p>
                    <Profile/>
                </div>

            ):(
                <div>
                    <RiLoginCircleFill/>
                    <Link href='/login'>
                        <a className={styles.profile_sign_in} >{langJson.form.label?.loginLabel}</a>
                    </Link>
                </div>



            )

            }
            <Select customClass={styles.option_list} isSelect={isSelect} inputValue={selectLang} label='Language' handelSelect={handelSelect}>
                {lang.map((l,k)=>(
                    <Options id={k} key={k} clos={handelSelect} value={l.value} selectValue={selectLang} name='Language' inputValue={setSelectLang} getId={setGetId}/>

                ))}
            </Select>
        </div>
        </div>
    );
};

export default ProfileBare;

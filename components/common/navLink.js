import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { isActiveUrl } from "../../utils/isActiveUrl";

const NavLink = ({ href, isSettingNav, children }) => {
  const router = useRouter();

  let defaultStyle;
  let activeStyle;
  // let width;
  let style;
  //設定サブナビの場合
  if (isSettingNav) {
    defaultStyle =
      "bg-purple-200 font-semibold h-12 leading-12 text-center hover:bg-purple-300 border-t-2";
    activeStyle =
      "bg-purple-300 font-semibold h-12 leading-12 text-center border-t-2";
    // width = 266;
    style = "w-266 block";
  } else {
    defaultStyle =
      "bg-purple-200 font-semibold h-12 leading-12 text-center hover:bg-purple-300 border-l-2";
    activeStyle =
      "bg-purple-300 font-semibold h-12 leading-12 text-center border-l-2";
    // width = 270;
    style = "w-270 block";
  }

  return (
    <li
      className={
        isActiveUrl(href, router.pathname) ? activeStyle : defaultStyle
      }
    >
      <Link href={href}>
        {/* <a className={`w-${width} block`}>{children}</a> */}
        <a className={style}>{children}</a>
      </Link>
    </li>
  );
};

export { NavLink };

import React from 'react'
import Link from 'next/link'
const NotFound = () => {
  return (
    <div className="notfound">
     
      <div className="notfound__rightContent">
        <h2>الصفحة غير موجودة</h2>
        <p>
          قم بالعودة للصفحة الرئيسية وحاول مجدداً <Link href="/">الصفحة الرئيسية</Link>
        </p>
      </div>
    </div>
  );
}




export default NotFound;
  
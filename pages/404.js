import React from 'react'
import Link from 'next/link'
const NotFound = () => {
  return (
     
      <div className="error-page system-page">
        <h1>الصفحة غير موجودة</h1>
        <p>
          قم بالعودة للصفحة الرئيسية وحاول مجدداً <Link href="/">الصفحة الرئيسية</Link>
        </p>
      </div>

  );
}




export default NotFound;
  
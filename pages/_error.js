function Error({ statusCode }) {
    return (
      <div className="error-page system-page">
                <h1>حدث خطأ</h1>
                <p>
                  {statusCode
                    ? `حدث خطأ داخلي بعنوان ${statusCode} من السيرفر الخاص بنا`
                    : 'حدث خطأ من الواجهة الامامية الخاصة بنا'}
                </p>
      </div>
    )
  }
  
  Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return { statusCode }
  }


  
  export default Error;
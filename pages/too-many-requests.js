const TooManyRequests = () => {
    return (
        <div className="error-page system-page">
            <h1>لقد لاحظنا الكثير من الطلبات</h1>
            <p>لقد لاحظنا انك تقوم بالكثير من طلبات البيانات على تطبيقنا وهذا يتعدى الحد الاقصى للطلبات في الدقيقة الواحدة لذلك نقوم بوضع حد اقصى للطلبات منعاً لحدوث أي ضرر للتطبيق</p>
        </div>
    );
};

export default TooManyRequests;
export const checkValidation = () => {
  // querySelectorAll 여러 쿼리 선택해서 가져옴 리스트 형태 
  // .valid 클래스명임
  const validList = document.querySelectorAll('.valid');
  console.log('validList:', validList);
  if(validList.length > 0) {
    // 아래는 유사배열은 진짜 배열로 변경하는 작업
    //validList는 유사배열 
    // Array.from(validList) 진짜 배열로 전환
    // 여러개의 유효성에 해당하는 message 문자열을 하나의 문자열로 만드는 작업
    // reduce에 전달된 인자는 prev, item('') 2개
    // 처음 prev는 공백 한번 실행하고 return  한값이 prev로 들어가서 진행
    const result = Array.from(validList).reduce((prev, item) => {
      let message = '';
      // 사용자가 입력한 데이터
      const value = item.value.trim();
      // getAttribute로 속성명 적어서 해당 속성에 데이터 값 가져옴 (true)
      const notNullMessage = item.getAttribute('not-null-message');
      if(notNullMessage && value.trim().length === 0) {
        // 아래에 getAttribute로 해당 속성에 있는 값을 넣는다 메시지를
        // 선입력 해둔걸 가져와서 message로 보내서 출력하게된다
        message = item.getAttribute('not-null-message') + '\n';
      } else if(value.length > 0){
        // 문자열로 정규식 표현으로 검사가 가능해서 한번 문자열로 만들긴해야함 
        const regexp = item.getAttribute('regexp');
        const regexpObj = new RegExp(regexp);
        
        // 유효성 체크하는것에 부합하는지  부합하면 true 아니면 false
        if(!value.match(regexpObj)) {
          message += item.getAttribute('regexp-message') + '\n';
        }   
      }
      return prev + message;
    }, '');
    if(result.length > 0) {
      alert(result);
    }
    return result.length > 0
  }
  return false;
}
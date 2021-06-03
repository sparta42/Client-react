export const isValidInputForm = (email, pw, name = true) => {
    if (!email || !pw || !name) {
        alert("입력창을 모두 채워주세요");
        return false;
    }
    if (!email.includes('@')) {
        alert("올바르지 않은 이메일 형식입니다.");
        return false;
    }
    return true;
}


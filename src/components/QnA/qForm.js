import styles from "../../styles/JoinUs/JoinForm.module.css"
import styles2 from "../../styles/JoinUs/JoinUsPage.module.css"
import { useState } from "react"
import axios from "axios";

export default function QForm() {
    const [formData, setFormData] = useState({
        content: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value, })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)

        try {
            const response = await axios.post("http://localhost:3000/qna/question", formData, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            console.log("응답 data: ", response.data)
            alert("글이 작성되었습니다!")
            setFormData({ content: "", password: "" })
        } catch (error) {
            console.error(error)
            alert("error 발생")
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className={styles2.questionForm}>
                <label>질문 내용*</label>
                <textarea
                    type="text"
                    name="content"
                    value={formData.content}
                    placeholder="질문을 작성해주세요."
                    onChange={handleChange}
                    className={styles.questionBox}
                    required
                />
                <button type="submit" className={styles.submitButton}>질문하기</button>
            </form>
        </div>
    )
}
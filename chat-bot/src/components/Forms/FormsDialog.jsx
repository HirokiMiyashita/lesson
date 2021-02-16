import React,{useState,useEffect,useCallback} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextInput from './TextInput';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useEventCallback } from '@material-ui/core';


const FormsDialog　= (props) =>　{
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [discription,setDiscription] = useState("");

    const inputName = useCallback((event) => {
        setName(event.target.value)
    },[setName])
    const inputEmail = useCallback((event) => {
        setEmail(event.target.value)
    },[setEmail])
    const inputDiscription = useCallback((event) => {
        setDiscription(event.target.value)
    },[setDiscription])

    const validateEmailFormat = (email) => {
        const regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        return regex.test(email)
    }

    const validateRequiredInput = (...args) => {
        let isBlank = false;
        for (let i = 0; i < args.length; i=(i+1)|0) {
            if (args[i] === "") {
                isBlank = true;
            }
        }
        return isBlank
    };

    
    const submitForm = () => {
        const isBlank = validateRequiredInput(name, email, discription)
        const isValidEmail = validateEmailFormat(email)
        

        if (isBlank) {
            alert('必須入力欄が空白です。')
            return false
        } else if (!isValidEmail) {
            alert('メールアドレスの書式が異なります。')
            return false
        }else {
        const payload = {
            text:'お問い合わせがありました\n' +
                'お名前:\n' + name + '\n' +
                'Email:' + email + '\n' +
                'お問い合わせ内容:\n' + discription 
        }
    
        const url = 'https://hooks.slack.com/services/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'

        fetch(url,{
            method:'POST',
            body:JSON.stringify(payload)
        }).then(() => {
            alert('送信が完了しました');
            setDiscription("")
            setEmail("")
            setName("")
            return props.handleClose()
        })
    }
}
            return(
                <Dialog
                    open={props.open}
                    onClose={props.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">お問い合わせフォーム</DialogTitle>
                    <DialogContent>
                        <TextInput 
                            label={"氏名（必須）"} 
                            multiline={false}
                            rows={1}
                            value={name}
                            type={"text"}
                            onChange={inputName}
                        />
                        <TextInput 
                            label={"mailアドレス"} 
                            multiline={false}
                            rows={1}
                            value={email}
                            type={"email"}
                            onChange={inputEmail}
                        />
                        <TextInput 
                            label={"本文"} 
                            multiline={false}
                            rows={1}
                            value={discription}
                            type={"text"}
                            onChange={inputDiscription}
                        />
                        
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={props.handleClose} color="primary">
                        キャンセル
                    </Button>
                    <Button onClick={submitForm} color="primary" autoFocus>
                        送信
                    </Button>
                    </DialogActions>
            </Dialog>
        )
}
export default FormsDialog　
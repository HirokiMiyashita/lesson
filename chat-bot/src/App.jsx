import React,{useState,useEffect,useCallback} from 'react';
import './assets/styles/style.css';
import {AnswersList,Chats} from './components/index';
import FormsDialog from './components/Forms/FormsDialog';
import {db} from './firebase/index';


const App = () => {
  const [answers,setAnswers] = useState([]);
  const [chats,setChats] = useState([]);
  const [currentId,setCurrentId] = useState("init");
  const [dataset,setDataset] = useState({});
  const [open,setOpen] = useState(false);

  const displayNextQuestion = (nextQuestionId,nextDataset) => {
    addChats({
      text:nextDataset.question,
      type:'question'
    })
      setAnswers(nextDataset.answers)
      setCurrentId(nextQuestionId)
  }

  const selectAnswer = (selectedAnswer,nextQuestionId) => {
    console.log(nextQuestionId)
    switch (true) {
      case (/^https:*/.test(nextQuestionId)):
        const a = document.createElement('a');
        a.href = nextQuestionId;
        a.target = '_blank';
        a.click();
        break;

        case (/^http:*/.test(nextQuestionId)):
        const b = document.createElement('a');
        b.href = nextQuestionId;
        b.target = '_blank';
        b.click();
        break;
      
      case(nextQuestionId === 'contact'):
        handleClickOpen();
      break;

      default:
        addChats({
          text:selectedAnswer,
          type:'answer'
        })
        setTimeout(() => 
          displayNextQuestion(nextQuestionId,dataset[nextQuestionId])
          ,500
      ) 
        break;
    }
  }

  const addChats = (chat) => {
    setChats(prevChats => {
      return [...prevChats,chat]
    })
  }
  const handleClickOpen = () => {
      setOpen(true)
  };

  const handleClose = useCallback(() => {
      setOpen(false)
  },[setOpen])

// ユーザーからの質問事項
  // initAnswer = () => {
  //   const initDataset = this.state.dataset[this.state.currentId];
  //   const initAnswers = initDataset.answers;
  //   console.log(initAnswers)

  //   this.setState({
  //     answers: initAnswers
  //   })
  // }
// 質問内容の返信（クライアント）
  useEffect(() => {
    (async() => {
      const initDataset = {};

      await db.collection('questions').get().then(snapshots =>{
        snapshots.forEach(doc => {
          const id = doc.id
          const data = doc.data()
          initDataset[id] = data
        })
      })
      setDataset(initDataset)
      displayNextQuestion(currentId,initDataset[currentId])

    })()
  },[])
  useEffect(() => {
    const scroll = document.getElementById("scroll_area");
    if(scroll){
      scroll.scrollTop = scroll.scrollHeight;
    }
  })
  


    return (
          <div className="c-box">
            <Chats chats={chats}/>
            <AnswersList answers= {answers} select={selectAnswer}/>
            <FormsDialog open={open} handleClose={handleClose}/>
          </div>
    );
  }


export default App

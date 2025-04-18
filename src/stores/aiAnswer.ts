import { assign } from "markdown-it/lib/common/utils.mjs";
import { defineStore } from "pinia";
import { ref, toValue } from "vue";
interface message {
    sentBy: string,
    content: content
}
interface content {
    text: string,
    files?: {
        name: string;
        url: string;
        file: File;
    }[]
}
export const useAiStore = defineStore("aiStore", () => {
    const messages = ref<message[]>([])
    const useStopComp = ref<boolean>(false)
    const isfinish = ref<boolean>(true)
    const addQuestion = (question:content)=>{
        messages.value.push({
            sentBy: 'user',
            content: question,
        });
    }
    const addAnswer = ()=>{
        messages.value.push({
            sentBy:'ai',
            content:{
                text:""
            }
        })
    }
    const addValueToAnswer = (value:any)=>{
        messages.value[messages.value.length-1].content.text += value
    }
    const changeStopState = ()=>{
        useStopComp.value = !useStopComp.value
    }
    const changeFinish = ()=>{
        isfinish.value = !isfinish.value
    }
    return {
        messages,
        useStopComp,
        isfinish,

        addQuestion,
        addAnswer,
        addValueToAnswer,
        changeStopState,
        changeFinish,
    }
})
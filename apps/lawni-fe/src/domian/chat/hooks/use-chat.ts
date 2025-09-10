'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { CreateAiChatDto } from '@workspace/http/lawni/chat';
import { getSessionStorage, setSessionStorage } from '@repo/utils';

import { useCreateAiChatMutation } from './use-mutations';

// ----------------------------------------------------------------------

interface ChatList {
  content: string;
  isAi: boolean;
}

export const useCreateChat = (code: string) => {
  const [chatList, setChatList] = useState<ChatList[] | []>([]);
  const { push } = useRouter();

  const { mutateAsync: createChat, data: aiData, isPending } = useCreateAiChatMutation();

  const form = useForm({
    values: {
      nextChat: '',
      previousChat: '',
      category: code,
      categoryDetails: undefined,
    },
    resolver: zodResolver(CreateAiChatDto),
  });

  const onSubmit = form.handleSubmit(
    async (data) => {
      const result = {
        ...data,
        previousChat: `${aiData?.note ?? ''} ::: ${aiData?.answer ?? ''}`,
      };

      setChatList((pre) => [...pre, { content: data.nextChat, isAi: false }]);
      form.reset({
        ...result,
        nextChat: '',
      });

      if (chatList.filter((item) => !item.isAi).length < 4) {
        const answer = await createChat(result);

        setChatList((pre) => [...pre, { content: answer.answer, isAi: true }]);
      }
    },
    (error) => {
      console.log(error);
    },
  );

  const handleEnterSubmit = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // if (e.key === 'Enter' && e.nativeEvent.isComposing === false) {
    //   e.preventDefault();
    //   e.stopPropagation();
    //   onSubmit();
    // }
  };

  const handleRouteOutcome = () => {
    setSessionStorage('chat', form.getValues());
    push('/chat/outcome');
  };

  const isFinish = chatList.filter((item) => !item.isAi).length >= 5;

  useEffect(() => {
    const infoData = getSessionStorage('info') as { questions: { question: string; answer: string }[] } | null;

    if (infoData) {
      form.setValue('categoryDetails', infoData.questions);

      createChat({
        nextChat: '해당 내용을 토대로 부족 내용에 대해 질문해줘',
        previousChat: '',
        category: code,
        categoryDetails: infoData.questions,
      }).then((res) => {
        setChatList((pre) => [...pre, { content: res.answer, isAi: true }]);
      });
    }
  }, []);

  return {
    chatList,
    onSubmit,
    isPending,
    form,
    handleEnterSubmit,
    isFinish,
    handleRouteOutcome,
  };
};

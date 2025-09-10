'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button, LoadingIcon } from '@workspace/ui/components/button';
import { CustomIcon, Text } from '@workspace/ui/components/text';
import { CreateAiChatDto } from '@workspace/http/must/ai-chat';
import { Spacing } from '@workspace/ui/components/box';
import { Input } from '@workspace/ui/components/form';
import { cn } from '@workspace/ui/lib';

import { useCreateChatMutation } from '@/domian/sunday/hooks';
import { BackBtnHeader } from '@/shared/components/header';
import { useMobileKeyboard } from '@/shared/hooks/use-mobile-keyboard';

// ----------------------------------------------------------------------

interface ChatList {
  content: string;
  isAi: boolean;
}

const initailChatList = [
  {
    content: '안녕하세요. 저는 샬롬의 아이입니다. 무엇을 도와드릴까요?',
    isAi: true,
  },
];

export default function ChatPage() {
  const [chatList, setChatList] = useState<ChatList[]>(initailChatList);
  const keyboard = useMobileKeyboard();

  const form = useForm({
    defaultValues: {
      content: '',
      instructions: '좀 짧게',
      maxTokens: 1000,
    },
    resolver: zodResolver(CreateAiChatDto),
  });

  const { mutateAsync: createChat, isPending } = useCreateChatMutation();

  // 키보드가 열릴 때 스크롤을 맨 아래로 이동
  useEffect(() => {
    if (keyboard.isVisible) {
      const main = document.querySelector('main');
      if (main) {
        setTimeout(() => {
          main.scrollTo({ top: main.scrollHeight, behavior: 'smooth' });
        }, 100);
      }
    }
  }, [keyboard.isVisible]);

  const onSubmit = form.handleSubmit(
    async (data) => {
      setChatList((pre) => [...pre, { content: data.content, isAi: false }]);
      form.reset();

      const answer = await createChat(data);

      setChatList((pre) => [...pre, { content: answer.content, isAi: true }]);
    },
    (error) => {
      console.log(error);
    },
  );

  return (
    <>
      <BackBtnHeader />
      <main
        ref={(el) => {
          el?.scrollTo({ top: el?.scrollHeight, behavior: 'smooth' });
        }}
        className="pt-[50px] px-5 relative h-dvh overflow-auto chat-container-with-keyboard"
      >
        <Spacing size={50} />
        <div className="flex flex-col gap-5">
          {chatList.map((item, index) => (
            <div key={index} className={cn('flex', item.isAi ? '' : 'flex-row-reverse')}>
              <Text
                as="p"
                className={cn(
                  'p-2 rounded-lg max-w-[250px] whitespace-pre-wrap',
                  item.isAi ? 'bg-gray-100' : 'bg-[#FF9500] text-white',
                )}
              >
                {item.content}
              </Text>
            </div>
          ))}

          {isPending && (
            <div className="px-2 pt-5">
              <LoadingIcon className="justify-start" color="bg-red-500" />
            </div>
          )}
          <Spacing size={100} />
        </div>
      </main>

      <form onSubmit={onSubmit} className="mobile-keyboard-safe px-4 pb-5 pt-3 bg-white border-t border-gray-100">
        <div className="flex gap-2 relative">
          <Input
            {...form.register('content')}
            placeholder="메시지를 입력해주세요"
            spellCheck={false}
            autoComplete="off"
            className="flex-1 pr-10"
          />
          <Button
            type="submit"
            disabled={isPending || !form.formState.isValid}
            className="absolute right-2 top-1/2 -translate-y-1/2"
          >
            <CustomIcon name="Send" />
          </Button>
        </div>
      </form>
    </>
  );
}

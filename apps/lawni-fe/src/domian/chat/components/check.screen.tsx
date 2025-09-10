'use client';

import { cn } from '@workspace/ui/lib';
import { Spacing } from '@workspace/ui/components/box';
import { Button, LoadingIcon } from '@workspace/ui/components/button';
import { Textarea } from '@workspace/ui/components/form';
import { CustomIcon, Text, TypingAnimation } from '@workspace/ui/components/text';

import { useCreateChat } from '@/domian/chat/hooks';

// ----------------------------------------------------------------------

export const CheckScreen = ({ code }: { code: string }) => {
  const { chatList, onSubmit, isPending, form, handleEnterSubmit, isFinish, handleRouteOutcome } = useCreateChat(code);

  const isAiLastChat = chatList.at(-1)?.isAi && chatList.at(-1)?.content;

  return (
    <main
      className="pt-[50px] px-5 relative h-dvh overflow-auto bg-white"
      ref={(el) => {
        el?.scrollTo({ top: el?.scrollHeight, behavior: 'smooth' });
        // el?.scrollIntoView({ inline: 'end', behavior: 'smooth' });
      }}
    >
      <Spacing size={50} />
      <div className="flex flex-col gap-5">
        {chatList.map((item, index) => (
          <div key={index} className={cn('flex', item.isAi ? '' : 'flex-row-reverse')}>
            {isAiLastChat && index === chatList.length - 1 ? (
              <TypingAnimation
                className="p-2 rounded-lg max-w-[250px] bg-gray-100"
                startOnView={!isPending}
                duration={50}
              >
                {isAiLastChat}
              </TypingAnimation>
            ) : (
              <Text
                as="p"
                className={cn(
                  'p-2 rounded-lg max-w-[250px] whitespace-pre-wrap',
                  item.isAi ? 'bg-gray-100' : 'bg-[#FF9500] text-white',
                )}
              >
                {item.content}
              </Text>
            )}
          </div>
        ))}
        {isFinish && (
          <TypingAnimation className="p-2 rounded-lg max-w-[250px] bg-gray-100" startOnView={!isPending} duration={50}>
            {`충분한 정보를 수집했어요! 👍\n이제 수집된 정보를 바탕으로 법적 문서를 작성할 준비가 되었어요.\n'상담 완료하기' 버튼을 눌러 다음 단계로 진행해주세요.`}
          </TypingAnimation>
        )}

        {isPending && (
          <div className="px-2 pt-5">
            <LoadingIcon className="justify-start" color="bg-red-500" />
          </div>
        )}
        <Spacing size={isFinish ? 200 : 100} />

        <form onSubmit={onSubmit} className="fixed bottom-0 inset-x-0 px-4 pb-5 pt-3 bg-white border-t">
          <div className="flex gap-2 relative">
            <Textarea
              // ref={textareaRef}
              {...form.register('nextChat')}
              onKeyDown={handleEnterSubmit}
              // onScroll={() => {
              //   textareaRef.current?.focus();
              // }}
              placeholder="질문에 답변해주세요"
              rows={1}
              maxLength={500}
              spellCheck={false}
              disabled={isFinish}
              autoComplete="off"
              className="flex-1 pr-11 resize-none min-h-[46px] max-h-[100px] text-sm leading-[20px]"
            />
            <Button
              type="submit"
              disabled={isPending || !form.formState.isValid || isFinish}
              className="absolute right-2 top-1/2 -translate-y-1/2"
            >
              <CustomIcon name="Send" />
            </Button>
          </div>

          {isFinish && (
            <div className="rounded-md bg-green-50 p-3 mt-2">
              <div className="flex flex-col gap-1 ">
                <Text className="text-green-800 font-semibold flex items-center gap-1">
                  <CustomIcon name="CircleCheckBig" size={15} strokeWidth={3} />
                  상담이 완료 되었습니다!
                </Text>
                <Text size={'sm'} className="text-green-600">
                  답변 정보를 바탕으로 문서를 작성해드릴게요
                </Text>
              </div>
              <Button size={'lg'} className="text-sm mt-4 w-full" onClick={handleRouteOutcome}>
                상담 완료하기
              </Button>
            </div>
          )}
        </form>
      </div>
    </main>
  );
};

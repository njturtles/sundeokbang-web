import DefaultLayout from "@/layout/DefaultLayout";
import styled from "@emotion/styled";
import React, { useEffect, useRef, useState } from "react";
import ChatbotIcon from "@/assets/icons/chatbot-icon.svg";
import SendIcon from "@/assets/icons/send-icon.svg";
import { ThreeDots } from "react-loader-spinner";
import { chatbotApi } from "@/apis/chatbot";

const ChatBotPage = () => {
    const messageRef = useRef<HTMLInputElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const chatbodyRef = useRef<HTMLUListElement>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [messages, setMessages] = useState<
        {
            id: number;
            message: string;
            type: "send" | "receive";
            timestamp: Date;
        }[]
    >([]);

    useEffect(() => {
        document.body.scrollIntoView(false);
    }, [messages]);

    const onSend = async () => {
        if (messageRef.current) {
            if (messageRef.current.value.length < 2) return;
            const message = messageRef.current.value;
            setIsLoading(true);
            setMessages((prev) => [
                ...prev,
                {
                    id: prev.length + 1,
                    message: message,
                    type: "send",
                    timestamp: new Date(),
                },
            ]);
            messageRef.current.value = "";
            await chatbotApi.getResponse(message).then((res) => {
                if (res.data.code !== 2000) {
                    alert(
                        "챗봇과 통신하는 도중 오류가 발생했습니다. 다시 시도해 주세요.",
                    );
                    setIsLoading(false);
                    return;
                }
                setMessages((prev) => [
                    ...prev,
                    {
                        id: prev.length + 1,
                        message: res.data.result,
                        type: "receive",
                        timestamp: new Date(),
                    },
                ]);
                setIsLoading(false);
            });
        }
    };

    return (
        <DefaultLayout>
            <Header>
                <ChatbotIcon />
                <HeaderTitle>순덕방 챗봇</HeaderTitle>
            </Header>
            <ChatContainer ref={chatbodyRef}>
                {messages.map((message) => (
                    <ChatBubble key={message.id} type={message.type}>
                        <ChatName type={message.type}>
                            {message.type === "receive" ? "순덕방 챗봇" : "나"}
                        </ChatName>
                        <ChatContent type={message.type}>
                            {message.message}
                        </ChatContent>
                        <ChatTimestamp>
                            {`${message.timestamp.getHours() >= 12 ? `오후` : `오전`} ${message.timestamp.getHours() > 12 ? message.timestamp.getHours() - 12 : message.timestamp.getHours()}시 ${message.timestamp.getMinutes() < 10 ? `0${message.timestamp.getMinutes()}` : message.timestamp.getMinutes()}분`}
                        </ChatTimestamp>
                    </ChatBubble>
                ))}
                {isLoading && (
                    <ChatBubble type="receive">
                        <ChatName type="receive">순덕방 챗봇</ChatName>
                        <ChatContent type="receive">
                            <ThreeDots color="#ccc" width={24} height={16} />
                        </ChatContent>
                    </ChatBubble>
                )}
            </ChatContainer>
            <InputContainer>
                <ChatInput
                    onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) =>
                        e.key === "Enter" &&
                        buttonRef.current &&
                        buttonRef.current.click()
                    }
                    ref={messageRef}
                    placeholder="궁금하신 내용을 입력해 주세요."
                />
                <SendButton
                    ref={buttonRef}
                    disabled={isLoading}
                    onClick={isLoading ? undefined : onSend}
                >
                    <SendIcon />
                </SendButton>
            </InputContainer>
        </DefaultLayout>
    );
};

const Header = styled.header`
    position: fixed;
    top: 0;
    left: 50%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 12px;
    width: min(480px, 100%);
    height: 80px;
    border-bottom: 2px solid ${({ theme }) => theme.color.white.hue3};
    background-color: ${({ theme }) => theme.color.white.hue1};
    transform: translateX(-50%);
`;

const HeaderTitle = styled.h1`
    font-size: 1.5rem;
    font-weight: 700;
    color: ${({ theme }) => theme.color.primary.hue1};
`;

const ChatContainer = styled.ul`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 32px;
    width: 100%;
    min-height: 100%;
    padding: 120px 24px;
`;

const ChatBubble = styled.li<{ type: "send" | "receive" }>`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    ${({ type }) => type === "send" && `align-items: flex-end;`}
    ${({ type }) => type === "receive" && `align-items: flex-start;`}
    gap: 8px;
    width: 100%;
    height: auto;
`;

const ChatName = styled.span<{ type: "send" | "receive" }>`
    font-size: 1rem;
    font-weight: 500;
    color: ${({ theme }) => theme.color.gray.hue3};
    ${({ type, theme }) =>
        type === "receive" &&
        `color: ${theme.color.primary.hue1}; font-weight: 600;`}
`;

const ChatContent = styled.div<{ type: "send" | "receive" }>`
    width: auto;
    max-width: 230px;
    height: auto;
    padding: 10px 16px;
    border: none;
    border-radius: 12px;
    background-color: ${({ theme }) => theme.color.white.hue3};
    color: ${({ theme }) => theme.color.black.hue0};
    line-height: 1.25rem;
    ${({ type }) => type === "send" && `text-align: right;`}
    ${({ type }) => type === "receive" && `text-align: left;`}
`;

const ChatTimestamp = styled.span`
    font-size: 0.75rem;
    font-weight: 300;
    color: ${({ theme }) => theme.color.gray.hue3};
`;

const InputContainer = styled.div`
    position: fixed;
    bottom: 0px;
    left: 50%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 12px;
    width: min(480px, 100%);
    height: 80px;
    padding: 16px;
    background-color: ${({ theme }) => theme.color.white.hue0};
    box-shadow: 0px -3px 30px -15px rgba(0, 0, 0, 0.25);
    transform: translateX(-50%);
`;

const ChatInput = styled.input`
    width: 100%;
    height: 48px;
    padding: 0 24px;
    border: 1px solid ${({ theme }) => theme.color.gray.hue2};
    border-radius: 48px;
    outline: none;
    font-size: 1rem;
    &:focus {
        outline: 2px solid ${({ theme }) => theme.color.primary.hue1};
    }
`;

const SendButton = styled.button<{ disabled?: boolean }>`
    width: 48px;
    height: 48px;
    border: none;
    border-radius: 48px;
    outline: none;
    background-color: ${({ theme }) => theme.color.primary.hue1};
    flex-shrink: 0;
    ${({ disabled, theme }) =>
        disabled && `background-color: ${theme.color.gray.hue3};`}
`;

export default ChatBotPage;

import { producer } from '../../config/configKafka.ts';

export const sendUserVerificationEvent = async (userId: string) => {
  await producer.connect();

  const message = {
    value: JSON.stringify({
      userId,
      event: 'USER_VERIFIED',
      timestamp: new Date().toISOString(),
    }),
  };

  await producer.send({
    topic: 'user-verification-events',
    messages: [message],
  });

  await producer.disconnect();
};
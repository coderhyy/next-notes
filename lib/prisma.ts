import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;

export async function getAllNotes() {
  const session = await auth();
  if (session === null) return [];
  const notes = await prisma.note.findMany({
    where: {
      authorId: session.user?.id,
    },
  });
  const list = notes.map(({ id, title, content, updatedAt }) => {
    return [
      id,
      JSON.stringify({
        title,
        content,
        updateTime: updatedAt,
      }),
    ];
  });

  return Object.fromEntries(list);
}

export async function addNote({ title, content }: Record<string, string>) {
  const session = await auth();
  if (session === null) return;
  const result = await prisma.note.create({
    data: {
      title,
      content,
      author: { connect: { id: session?.user?.id } },
    },
  });
  return result.id;
}

export async function updateNote(uuid: string, data: Record<string, string>) {
  await prisma.note.update({
    where: { id: uuid },
    data,
  });
}

export async function getNote(uuid: string) {
  const session = await auth();
  if (session === null) return;
  const res = await prisma.note.findFirst({
    where: { id: uuid },
  });
  return {
    ...res,
    updateTime: res?.updatedAt,
  };
}

export async function delNote(uuid: string) {
  await prisma.note.delete({
    where: { id: uuid },
  });
}

export async function addUser(username: string, password: string) {
  const user = await prisma.user.create({
    data: {
      username,
      password,
      notes: {
        create: [],
      },
    },
  });
  return { id: user.id, name: username };
}

export async function getUser(username: string, password: string) {
  const user = await prisma.user.findFirst({
    where: { username },
    include: { notes: true },
  });
  if (!user) return 0;
  if (user.password !== password) return 1;
  return { id: user.id, name: username };
}

export default prisma;

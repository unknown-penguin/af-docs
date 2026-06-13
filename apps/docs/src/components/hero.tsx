'use client';

import React, { type FC } from 'react';
import { CodeBlock, Pre } from 'fumadocs-ui/components/codeblock';
import { motion } from 'motion/react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Logo } from './logo';
import { Silk } from './silk-bg';

const MotionCodeBlock = motion(CodeBlock);

export const Hero: FC = () => {
  return (
    <>
      <div
        className={cn(
          'absolute inset-0 ',
          'after:content-[""] after:bg-radial after:from-cyan-500/40 after:to-black after:absolute after:inset-0',
          'animate-in fade-in duration-1000',
        )}
      >
        <Silk className="animate-in duration-2000 fade-in" />
      </div>

      <section className="flex flex-col flex-1 justify-center w-full text-center">
        <div className="relative flex flex-col items-center gap-10 blur-in-lg px-5 pt-10 pb-16">
          <motion.div
            transition={{ duration: 0.5 }}
            className="z-20 relative flex items-center gap-1.5"
            initial={{
              opacity: 0,
              scale: 0,
              transform: 'rotate(180deg)',
              filter: 'blur(10px)',
              transformOrigin: 'center center',
            }}
            animate={{
              opacity: 1,
              scale: 1,
              filter: 'blur(0px)',
              transform: 'rotate(0deg)',
            }}
          >
            <Logo className="w-16 h-16" />
          </motion.div>
        </div>
        <div className="z-20 relative flex flex-col items-center gap-4 mx-auto px-6 max-w-2xl">
          <motion.div
            className="bg-cyan-500/20 backdrop-blur-sm mb-6 px-2 border border-cyan-400 rounded-full text-cyan-300 text-sm"
            transition={{ duration: 0.5, delay: 0.2 }}
            initial={{
              opacity: 0,
              y: -20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
          >
            Архітектура, API та діаграми поточної реалізації
          </motion.div>
          <motion.h1
            transition={{ duration: 0.5, delay: 0.4 }}
            className={cn(
              'font-bold text-5xl sm:text-6xl text-center',
              'bg-gradient-to-tr from-35% from-white to-zinc-400 inline-block text-transparent bg-clip-text',
            )}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
          >
            AF Docs
          </motion.h1>
          <motion.p
            className="font-light text-neutral-300/80 text-lg text-balance"
            transition={{ duration: 0.5, delay: 0.6 }}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
          >
            Українська технічна документація для Flutter застосунку, FastAPI backend, інтеграцій, потоків і схеми даних.
          </motion.p>
          <motion.div
            className="flex flex-col gap-2"
            transition={{ duration: 0.5, delay: 0.8 }}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
          >
            <Link
              href="/docs"
              className="bg-white hover:bg-zinc-100 px-4 py-2 border rounded-full text-black text-sm hover:scale-95 transition-all duration-300"
            >
              Відкрити документацію
            </Link>
          </motion.div>

          <MotionCodeBlock
            className="bg-zinc-900 px-8 pr-10 rounded-lg ring-4 ring-zinc-300/20 text-left"
            lang="bash"
            transition={{ duration: 0.5, delay: 1 }}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
          >
            <Pre className="text-zinc-300">cd af-docs</Pre>
            <br />
            <Pre className="text-zinc-500"># Оновити AF OpenAPI reference</Pre>
            <br />
            <Pre className="text-zinc-300">pnpm build:openapi</Pre>
            <br />
            <Pre className="text-zinc-500"># Запустити локально</Pre>
            <br />
            <Pre className="text-zinc-300">pnpm dev</Pre>
          </MotionCodeBlock>
        </div>
      </section>
    </>
  );
};

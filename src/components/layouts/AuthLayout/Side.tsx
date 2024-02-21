import { cloneElement } from 'react'
import Logo from '@/components/template/Logo'
import { APP_NAME } from '@/constants/app.constant'
import type { CommonProps } from '@/@types/common'

interface SideProps extends CommonProps {
    content?: React.ReactNode
}

const Side = ({ children, content, ...rest }: SideProps) => {
    return (
        <div className="grid lg:grid-cols-3 h-full">
            <div
                className="bg-no-repeat bg-cover py-6 px-16 flex-col justify-between hidden lg:flex"
                style={{
                    backgroundImage: `url('/img/others/auth-side-bg.jpg')`,
                }}
            >
                <Logo mode="dark" logoWidth={300} />
                <div>
                    <div className="mb-6 flex items-center gap-4">
                        <div className="text-white">
                            <div className="font-semibold text-base"></div>
                            <span className="opacity-80"></span>
                        </div>
                    </div>
                    <p className="text-base text-white opacity-80">
                        <b>
                            <a
                                href="https://www.funttastic.com/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Funttastic{' '}
                            </a>
                        </b>
                        leads the blockchain innovation wave, mastering
                        High-Frequency Trading (HFT), Market Making (MMing) via
                        Hummingbot, and advancing in Machine Learning (ML) and
                        Reinforcement Learning (RL). Our core strengths lie in
                        developing Smart Contracts, leveraging Web3
                        technologies, and integrating GPT for financial
                        analysis, offering a competitive edge in the
                        cryptocurrency realm.
                        <br />
                        <br />
                        <b>
                            <a
                                href="https://kujira.network/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Kujira{' '}
                            </a>
                        </b>
                        is a decentralized ecosystem revolutionizing FinTech to
                        provide sustainable solutions for Web3 protocols,
                        builders, and users. An innovation hub of
                        revenue-generating products with great user experience,
                        Kujira allows retail investors to access opportunities
                        previously only available to the wealthy and elite.
                    </p>
                </div>
                <span className="text-white">
                    Copyright &copy; {`${new Date().getFullYear()}`}{' '}
                    <span className="font-semibold">{`${APP_NAME}`}</span>{' '}
                </span>
            </div>
            <div className="col-span-2 flex flex-col justify-center items-center bg-white dark:bg-gray-800">
                <div className="xl:min-w-[450px] px-8">
                    <div className="mb-8">{content}</div>
                    {children
                        ? cloneElement(children as React.ReactElement, {
                              ...rest,
                          })
                        : null}
                </div>
            </div>
        </div>
    )
}

export default Side

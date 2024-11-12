"use client"

import Image from 'next/image';
import { randomImage } from '@/utils';
import { getRandomArticleListAPI } from '@/api/article';
import article from '@/assets/svg/other/article.svg'
import "./index.scss"
import Link from 'next/link';

const HotArticle = async () => {
    const { data } = await getRandomArticleListAPI()

    return (
        <div className='RandomArticleComponent'>
            <div className="flex flex-col p-4 mb-5 bg-white dark:bg-black-b tw_container tw_title">
                <h3 className="w-full tw_title dark:text-white">
                    <Image src={article} alt="随机推荐" /> 随机推荐
                </h3>

                <div className="w-full pt-2.5 mt-2 min-h-[120px] space-y-4">
                    {data?.map((item, index) => (
                        <div
                            key={index}
                            className="item relative h-32 bg-no-repeat bg-center rounded-md transition-all after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-12 after:transition-opacity after:rounded-md after:bg-[linear-gradient(transparent,#000)]"
                            style={{ backgroundImage: `url(${item.cover || randomImage()})` }}
                        >
                            <Link href={`/article/${item.id}`} target='_blank' className='inline-block w-full h-full'>
                                <h4 className=' absolute bottom-2.5 w-[95%] px-2.5 text-white text-[15px] font-normal line-clamp-1 z-10'>{item.title}</h4>
                            </Link>

                            <span className='ranking absolute top-2.5 left-[-16px] w-[30px] h-[25px] pl-[7px] text-white rounded-tr-full rounded-br-full font-black box-border after:content-[""] after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-0 after:border-[5px] after:border-solid'>{index + 1}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HotArticle;
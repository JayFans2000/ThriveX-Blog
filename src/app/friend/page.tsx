import { Metadata } from "next";
import Starry from "@/components/Starry";
import Swiper from "@/components/Swiper";
import { getWebListAPI } from '@/api/web'
import { Web } from "@/types/app/web";
import Link from "next/link";

export const metadata: Metadata = {
    title: "朋友圈",
    description: "Generated by create next app",
};

export default async () => {
    const { data } = await getWebListAPI()
    const list: { [string: string]: Web[] } = {}

    // 给每个数据进行分组处理
    data.forEach(item => {
        if (list[item.typeName]) {
            list[item.typeName].push(item)
        } else {
            list[item.typeName] = [item]
        }
    })

    return (
        <>
            <Swiper isRipple={false}>
                {/* 星空背景组件 */}
                <Starry />

                {/* 分类信息 */}
                <div className="absolute top-[35%] left-[50%] transform -translate-x-1/2 w-[80%] text-center text-white text-[20px] xs:text-[25px] sm:text-[30px] custom_text_shadow">
                    一个人的寂寞，一群人的狂欢
                </div>
            </Swiper>

            <div className="relative -top-36 w-[90%] xl:w-[1200px] p-10 pt-2 mx-auto bg-white dark:bg-black-b border dark:border-black-b rounded-2xl space-y-8 transition-colors">
                {
                    Object.keys(list).map((type, index) => (
                        <div key={index}>
                            <h3 className="w-2/6 mx-auto text-center text-xl p-4 dark:text-white transition-colors">{type}</h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                                {
                                    list[type].map((item: Web) => (
                                        <Link key={item.id} href={item.url} className="group">
                                            <div key={item.id} className="flex items-center p-3 border group-hover:border-2 dark:border-[#3d4653] group-hover:!border-primary group-hover:shadow-[0_10px_20px_1px_rgb(83,157,253,.1)] rounded-md transition-colors">
                                                <img src={item.image} alt={item.title} className="w-14 h-14 mr-4 rounded-full" />

                                                <div className="flex flex-col space-y-2">
                                                    <h4 className="text-sm text-gray-700 dark:text-white group-hover:text-primary">{item.title}</h4>
                                                    <p className="text-xs text-[#8c9ab1] line-clamp-2">{item.description}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}
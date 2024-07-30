import { Inter } from "next/font/google";
import { Noto_Kufi_Arabic } from "next/font/google";


export const notoKufiArabic = Noto_Kufi_Arabic({
    subsets: ['arabic'],
    weight: ['200','300', '400', '500', '600', '700', '800'],
    variable: '--Noto-Font',
    display: 'swap',
  }); 
// main.ts中绑定的全局变量
interface GlobalMethods {
  $isWechat: () => boolean,
  $goLogin: () => void,
  $setOssCover: (url: string, w?: number, q?: number) => string,
  $uploadFile: (obj: uploadFileParamsInter) => Promise<APIResponseInter>
  $timeFormat: (dateTime?: string, formatStr?: string) => string
}
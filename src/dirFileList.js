import { readdir, stat } from 'fs/promises';
import path from 'path';

export const fileList = async (rootPath) => {
  const filePath = path.resolve(rootPath);
  const fileList = [];

  /**
   * 文件遍历方法
   * @param filePath 需要遍历的文件路径
   */
  const fileDisplay = async (filePath) => {
    console.log(filePath)
    try {
      const files = await readdir(filePath);
      for (const filename of files) {
        let filedir = path.join(filePath, filename);

        const statRes = await stat(filedir);

        const isFile = statRes.isFile(); //是文件
        const isDir = statRes.isDirectory(); //是文件夹
        if (isFile) {
          filedir = filedir.replace('“', '`“');
          filedir = filedir.replace('”', '`”');
          fileList.push(`"${filedir}"` || { path: filedir });
        }
        if (isDir) await fileDisplay(filedir);
      }
    } catch (err) {
      console.error(err, '---');
    }
  };

  await fileDisplay(filePath);

  return fileList;
};

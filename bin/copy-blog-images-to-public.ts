import fs from 'fs';
import { join } from 'path';
import path from 'path';
import fsExtra from 'fs-extra';

const fsPromises = fs.promises;
const targetDir = './public/images/blog';
const POSTS_ABSOLUTE_DIRECTORY_PATH = join(process.cwd(), '/content');

async function copyImagesToPublic(images: string[], slug: string) {
  for (const image of images) {
    await fsPromises.copyFile(
      `${POSTS_ABSOLUTE_DIRECTORY_PATH}/${slug}/${image}`,
      `${targetDir}/${slug}/${image}`
    );
  }
}

async function createPostImageFoldersForCopy() {
  // Get every post folder: post-one, post-two etc.
  const postSlugs = (await fsPromises.readdir(POSTS_ABSOLUTE_DIRECTORY_PATH)).filter(
    (slug) => slug[0] !== '.'
  );

  for (const slug of postSlugs) {
    const allowedImageFileExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp'];

    // Read all files inside current post folder
    const postDirFiles = await fsPromises.readdir(`${POSTS_ABSOLUTE_DIRECTORY_PATH}/${slug}`);

    // Filter out files with allowed file extension (images)
    const images = postDirFiles.filter((file) =>
      allowedImageFileExtensions.includes(path.extname(file))
    );

    if (images.length) {
      // Create a folder for images of this post inside public
      await fsPromises.mkdir(`${targetDir}/${slug}`);

      await copyImagesToPublic(images, slug);
    }
  }
}

async function main() {
  console.log(`Deleting images directory ${targetDir}`);
  await fsExtra.emptyDir(targetDir);
  await createPostImageFoldersForCopy();
}

main();

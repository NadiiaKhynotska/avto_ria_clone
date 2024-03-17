import { BadRequestException } from '@nestjs/common';

// Функція для зміни імені файлу
export const editFileName = (req, file, callback) => {
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random());
  const fileExtension = file.originalname.split('.').pop();
  const randomName = `${uniqueSuffix}.${fileExtension}`;
  callback(null, randomName);
};

// Фільтр для перевірки типу файлу
export const imageFileFilter = (req, file, callback) => {
  const allowedExtensions = ['jpg', 'jpeg', 'png'];
  const fileExtension = file.originalname.split('.').pop().toLowerCase();
  const isValidExtension = allowedExtensions.includes(fileExtension);

  if (!isValidExtension) {
    return callback(
      new BadRequestException(
        'Invalid file format. Supported formats: JPG, JPEG, PNG',
      ),
      false,
    );
  }

  callback(null, true);
};

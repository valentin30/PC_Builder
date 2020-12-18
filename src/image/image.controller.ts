import {
    BadRequestException,
    Controller,
    Get,
    Param,
    Post,
    Res,
    UploadedFiles,
    UseGuards,
    UseInterceptors
} from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { editFileName, imageFileFilter } from '../utils/image-upload.utils'
import { ImageArrayResponse } from './interface/image-response.interface'
import { ImageService } from './image.service'
import { Image } from './image.entity'
import { AdminJwtGuard } from 'src/auth/guard/admin.guard'
import { Response } from 'express'

@Controller('image')
export class ImageController {
    constructor(private readonly imageServise: ImageService) {}

    @Get(':url')
    getImage(@Param('url') url: string, @Res() res: Response) {
        res.sendFile(url, { root: 'uploads' })
    }

    @UseGuards(AdminJwtGuard)
    @Post()
    @UseInterceptors(
        FilesInterceptor('image', 40, {
            storage: diskStorage({
                destination: './uploads',
                filename: editFileName
            }),
            fileFilter: imageFileFilter
        })
    )
    async uploadMultipleFiles(@UploadedFiles() files: []): Promise<ImageArrayResponse> {
        if (!files) throw new BadRequestException('No images provided')
        const images: Image[] = await this.imageServise.create(files)
        return { images }
    }
}

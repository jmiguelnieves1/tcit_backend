import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { postResponses } from '../../common/responses/postResponses.response';
import { CreatePostDTO } from './dtos/createPostDto.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  @Post()
  async create(@Body() data: CreatePostDTO) {
    return {
      ...postResponses.create.success,
      post: await this.postService.create(data),
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return {
      ...postResponses.delete.success,
      post: await this.postService.delete(id),
    };
  }

  @Get()
  async getAll() {
    return {
      ...postResponses.list.success,
      posts: await this.postService.getAll(),
    };
  }
}

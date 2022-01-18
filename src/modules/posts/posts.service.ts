import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Status } from '../../common/enums/status.enum';
import { postResponses } from '../../common/responses/postResponses.response';
import { BaseService } from '../../common/services/base.service';
import { Post } from '../../models/post.entity';
import { CreatePostDTO } from './dtos/createPostDto.dto';

@Injectable()
export class PostsService extends BaseService<Post> {
  private readonly responses = { ...postResponses };

  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {
    super(postRepository);
  }

  /**
   * Create new post
   * @param {CreatePostDTO} data - Data to create new post
   * @returns {Promise<Post>}
   */
  async create(data: CreatePostDTO): Promise<Post> {
    return this.save(data);
  }

  /**
   * Delete a post by id
   * @param {number} id - Post id
   * @returns {Promise<Post>}
   */
  async delete(id: number): Promise<Post> {
    const post = await this.getById(id, this.responses.delete.error);
    if (!post) {
      throw new ForbiddenException(this.responses.delete.postNotExists);
    }
    return this.deleteEntityByStatus(post);
  }

  /**
   * Get all posts
   * @returns {Promise<Post[]>}
   */
  async getAll(): Promise<Post[]> {
    return await this.postRepository.find({
      where: { status: Not(Status.DELETE) },
    });
  }

  /**
   * Get post by id
   * @param {number} id - Post id
   * @param {*} response - Response in case of failed
   * @returns {Promise<Post>}
   */
  private async getById(id: number, response: any): Promise<Post> {
    return await this.postRepository
      .createQueryBuilder('post')
      .where('post.id = :id', { id })
      .andWhere('post.status <> :status', { status: Status.DELETE })
      .getOne()
      .catch(() => {
        throw new InternalServerErrorException(response);
      });
  }
}

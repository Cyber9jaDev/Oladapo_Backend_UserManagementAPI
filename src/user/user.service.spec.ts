import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { DatabaseService } from 'src/database/database.service';
import { Role } from '@prisma/client';
import { NotFoundException } from '@nestjs/common';

const mockGetUsers = [
  {
    id: '69c83dbf-06d9-4df9-80f6-22759336b697',
    name: 'Ayodeji Oladapo',
    email: 'oladapo2@gmail.com',
    role: Role.USER,
  },
];
describe('UserService', () => {
  let userService: UserService;
  let databaseService: DatabaseService;

  // Before
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: DatabaseService,
          useValue: {
            user: {
              findMany: jest.fn().mockResolvedValue(mockGetUsers), //Any time findMany is called, this is what will be returned
            },
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    databaseService = module.get<DatabaseService>(DatabaseService);
  });

  // After
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('getUsers', () => {
    const filters = {
      createdAt: {
        gte: new Date(),
        lte: new Date(),
      },
      dateFrom: new Date(),
      dateTo: new Date(),
    };

    it('should return an array of users', async () => {
      const mockDatabaseFindManyUsers = jest
        .fn()
        .mockResolvedValue(mockGetUsers);
      jest
        .spyOn(databaseService.user, 'findMany')
        .mockImplementation(mockDatabaseFindManyUsers);
      await userService.findAllUsers(filters, 5, 1);
      expect(mockDatabaseFindManyUsers).toHaveBeenCalledWith({
        where: { ...filters },
        take: 5,
        skip: 1,
        select: { id: true, name: true, email: true, role: true },
      });
    });

    it('should throw not found exception if no users are found', async () => {
      const mockDatabaseFindManyUsers = jest.fn().mockResolvedValue([]);
      jest
        .spyOn(databaseService.user, 'findMany')
        .mockImplementation(mockDatabaseFindManyUsers);
      await expect(userService.findAllUsers(filters, 0, 1)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});

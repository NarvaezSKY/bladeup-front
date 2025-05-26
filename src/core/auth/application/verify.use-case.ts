import { IAuthRepository } from '../domain/auth.repository';


export const verifyUseCase = (authRepository: IAuthRepository) => {
    return authRepository.verify
}

export enum Educational {
  junior = 'junior',
  secondary = 'secondary',
  senior = 'senior',
  shortCycle = 'shortCycle',
  normal = 'normal',
  master = 'master',
  doctor = 'doctor',
}

export const EducationalMap: Record<string, `${Educational}`> = {
  '初中及以下': 'junior',
  '中专/中技': 'secondary',
  '高中': 'senior',
  '大专': 'shortCycle',
  '本科': 'normal',
  '硕士': 'master',
  '博士': 'doctor',
}

export const SexMap = {
  male: '男',
  female: '女',
  all: '全部',
}

export enum Lock {
  key = 'lockKey'
}

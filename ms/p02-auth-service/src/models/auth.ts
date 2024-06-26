// https://sequelize.org/docs/v6/other-topics/typescript/

import { sequelize } from '@auth/database';
import { IAuthDocument } from '@yuangao0317/ms-rrts-at-shared-common';
import { compare, hash } from 'bcrypt';
import { DataTypes, Model, ModelDefined, Optional } from 'sequelize';

const SALT_ROUND = 10;

interface UserModelInstanceMethods extends Model {
  prototype: {
    comparePassword: (password: string, hashedPassword: string) => Promise<boolean>;
    hashPassword: (password: string) => Promise<string>;
  };
}

type AuthUserCreationAttributes = Optional<
  IAuthDocument,
  'id' | 'createdAt' | 'passwordResetToken' | 'passwordResetExpires' | 'profilePicture'
>;

const UserModel: ModelDefined<IAuthDocument, AuthUserCreationAttributes> & UserModelInstanceMethods = sequelize.define(
  'Users',
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    profilePublicId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    profilePicture: {
      type: DataTypes.STRING,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Date.now
    },
    emailVerificationToken: {
      type: DataTypes.STRING,
      allowNull: true
    },
    emailVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    },
    passwordResetToken: { type: DataTypes.STRING, allowNull: true },
    passwordResetExpires: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date()
    }
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['email']
      },
      {
        unique: true,
        fields: ['username']
      }
    ]
  }
) as ModelDefined<IAuthDocument, AuthUserCreationAttributes> & UserModelInstanceMethods;

// Model lifecycle events
UserModel.addHook('beforeCreate', async (user: Model) => {
  const hashedPassword: string = await hash(user.dataValues.password as string, SALT_ROUND);
  user.dataValues.password = hashedPassword;
});

// Model instance methods
UserModel.prototype.comparePassword = async function (password: string, hashedPassword: string): Promise<boolean> {
  return compare(password, hashedPassword);
};

UserModel.prototype.hashPassword = async function (password: string): Promise<string> {
  return hash(password, SALT_ROUND);
};

/*
// https://sequelize.org/docs/v6/core-concepts/assocs/
User.hasMany(Project, {
  sourceKey: 'id',
  foreignKey: 'ownerId',
  as: 'projects' // this determines the name in `associations`!
});

Address.belongsTo(User, { targetKey: 'id' });
User.hasOne(Address, { sourceKey: 'id' });
*/

// https://sequelize.org/docs/v6/core-concepts/model-basics/#model-synchronization
UserModel.sync({});
export { UserModel };

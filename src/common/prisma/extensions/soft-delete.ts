import { createSoftDeleteExtension } from 'prisma-extension-soft-delete';

const softDelete = createSoftDeleteExtension({
  models: {
    User: true,
    Admin: true,
    Holder: true,
  },
  defaultConfig: {
    field: 'deletedAt',
    createValue: (deleted) => {
      if (deleted) return new Date();
      return null;
    },
    allowCompoundUniqueIndexWhere: true,
    allowToOneUpdates: true,
  },
});

export default softDelete;

class AddStorageType < ActiveRecord::Migration
  def change
    add_column :storages, :bookmark, :booleanm, default: false
  end
end

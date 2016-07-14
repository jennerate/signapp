class CreateStorages < ActiveRecord::Migration
  def change
    create_table :storages do |t|
      t.references :user
      t.string :link_url
      t.string :name
      t.timestamps
    end
  end
end

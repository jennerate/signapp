class CreateAccount < ActiveRecord::Migration
  def change
    create_table :accounts do |t|
      t.references :user
      t.string :type
      t.timestamps
    end
  end
end
